import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private socket!: Socket;
    private url = 'http://localhost:3000'; // Socket server URL
    private isConnected = false;
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);

        // Use window check as fallback for Angular hydration
        if (typeof window !== 'undefined') {
            this.isBrowser = true;
        }

        // Only create socket connection in browser, not during SSR
        if (this.isBrowser) {
            this.socket = io(this.url);
            this.socket.on('connect', () => {
                this.isConnected = true;
            });
            this.socket.on('disconnect', () => {
                this.isConnected = false;
            });
            this.socket.on('connect_error', (error) => {
                console.error('Socket connection error:', error);
            });
        }
    }

    createBooking(bookingData: any): Observable<any> {
        return new Observable(observer => {
            if (!this.isBrowser) {
                observer.error('Socket not available during SSR');
                return;
            }

            this.socket.emit('createBooking', bookingData);

            // Assume success since we are not waiting for an acknowledgement
            observer.next({ success: true, message: 'Booking sent to server' });
            observer.complete();
        });
    }

    // Request all bookings from server
    getBookings(): void {
        if (!this.isBrowser) {
            return;
        }

        // Wait for connection if not connected yet
        if (this.isConnected) {
            this.socket.emit('getBookings');
        } else {
            this.socket.once('connect', () => {
                this.socket.emit('getBookings');
            });
        }
    }

    // Listen for bookings list from server
    onBookingsList(): Observable<any[]> {
        return new Observable(observer => {
            if (!this.isBrowser) {
                observer.next([]);
                return;
            }

            // Remove any existing listener first to prevent duplicates
            this.socket.off('bookingsList');

            this.socket.on('bookingsList', (bookings: any[]) => {
                observer.next(bookings);
            });

            // Cleanup function
            return () => {
                if (this.isBrowser) {
                    this.socket.off('bookingsList');
                }
            };
        });
    }

    // Listen for new booking created in real-time
    onNewBooking(): Observable<any> {
        return new Observable(observer => {
            if (!this.isBrowser) {
                return;
            }

            // Remove any existing listener first to prevent duplicates
            this.socket.off('server_notify_new_booking');

            this.socket.on('server_notify_new_booking', (booking: any) => {
                observer.next(booking);
            });

            // Cleanup function
            return () => {
                if (this.isBrowser) {
                    this.socket.off('server_notify_new_booking');
                }
            };
        });
    }
}
