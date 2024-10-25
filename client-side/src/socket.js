import { io } from 'socket.io-client';

let socket; // Declare socket outside to maintain its instance

// Function to initialize the socket connection
export const initSocket = () => {
    socket = io('http://localhost:7007'); // Replace with your backend URL if needed
    console.log('Socket connected:', socket.id);
};

// Function to emit events
export const emitEvent = (event, data) => {
    if (!socket) {
        console.error('Socket not initialized. Call initSocket() first.');
        return;
    }else{
        socket.emit(event, data);
    }
    
};

// Function to listen for events
export const listenEvent = (event, callback) => {
    if (!socket) {
        console.error('Socket not initialized. Call initSocket() first.');
        return;
    }
    socket.on(event, callback);
};

// Optional: Function to disconnect socket
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        console.log('Socket disconnected');
    }
};