export interface Device {
  id: string;
  name: string;
  imageUrl?: string;
  description: string;
  category: string;
  rentalPrice: number;
  availableFrom: Date;
  availableTo?: Date;
  status: 'available' | 'rented' | 'maintenance';
}
