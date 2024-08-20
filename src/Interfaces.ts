// Interfaces.ts
export interface Booking {
    id: number;
    rooms: number;
    fromdate: string;
    todate: string;
    cost: number;
}

export interface Hotel {
    id: number;
    name: string;
    address: string;
    numofrooms: number;
    availablerooms: number;
    occupiedrooms: number;
    costperroom: number;
    bookings?: Booking[];
}
