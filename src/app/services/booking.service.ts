import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private socket: Socket;
    private url = 'http://localhost:3000'; // Socket server URL

    constructor() {
        this.socket = io(this.url);
        this.socket.on('connect', () => {
            console.log('Socket connected:', this.socket.id);
        });
        this.socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });
        this.socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });
    }

    createBooking(bookingData: any): Observable<any> {
        return new Observable(observer => {
            console.log('Socket connected status:', this.socket.connected);
            console.log('Emitting createBooking event (Fire and Forget)', bookingData);

            this.socket.emit('createBooking', bookingData);

            // Assume success since we are not waiting for an acknowledgement
            observer.next({ success: true, message: 'Booking sent to server' });
            observer.complete();
        });
    }
}
