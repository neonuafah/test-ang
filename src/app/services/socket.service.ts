import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket: Socket;
    private readonly URL = 'http://localhost:3000'; // Backend URL

    constructor() {
        this.socket = io(this.URL);
    }

    // Listen for an event
    listen(eventName: string): Observable<any> {
        return new Observable((subscriber) => {
            this.socket.on(eventName, (data: any) => {
                subscriber.next(data);
            });
        });
    }

    // Emit an event (if needed in future)
    emit(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }
}
