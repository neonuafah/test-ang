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
        });
        this.socket.on('disconnect', () => {
        });
        this.socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });
    }

    createBooking(bookingData: any): Observable<any> {
        return new Observable(observer => {

            this.socket.emit('createBooking', bookingData);

            // Assume success since we are not waiting for an acknowledgement
            observer.next({ success: true, message: 'Booking sent to server' });
            observer.complete();
        });
    }
}
