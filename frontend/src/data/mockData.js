export const VIEWING_REQUESTS = [
  { id: 1, client: 'Lungelo Khumalo', email: 'lungelo@email.com', phone: '+27 82 333 4455', property: 'Luxury Villa in Sandton', date: '2025-07-10', status: 'Pending', message: 'Interested in viewing this weekend.' },
  { id: 2, client: 'Amara Osei', email: 'amara@email.com', phone: '+27 71 888 9900', property: 'Modern Apartment in Sea Point', date: '2025-07-12', status: 'Confirmed', message: 'Available any morning.' },
  { id: 3, client: 'Riana du Plessis', email: 'riana@email.com', phone: '+27 83 555 6677', property: 'Family Home in Umhlanga', date: '2025-07-08', status: 'Completed', message: '' },
  { id: 4, client: 'Sipho Ndlovu', email: 'sipho@email.com', phone: '+27 76 111 2233', property: 'Beachfront Penthouse in Clifton', date: '2025-07-15', status: 'Pending', message: 'Cash buyer, very interested.' },
  { id: 5, client: 'Fatima Patel', email: 'fatima@email.com', phone: '+27 84 777 8899', property: 'Townhouse in Pretoria East', date: '2025-07-09', status: 'Cancelled', message: 'Changed plans.' },
];

export const USERS = [
  { id: 1, name: 'Sarah Mokoena', email: 'sarah@propconnect.co.za', role: 'Agent', status: 'Active', joined: '2024-01-15', listings: 12 },
  { id: 2, name: 'James van der Berg', email: 'james@propconnect.co.za', role: 'Agent', status: 'Active', joined: '2024-02-20', listings: 8 },
  { id: 3, name: 'Priya Naidoo', email: 'priya@propconnect.co.za', role: 'Agent', status: 'Active', joined: '2024-03-10', listings: 15 },
  { id: 4, name: 'Thabo Dlamini', email: 'thabo@propconnect.co.za', role: 'Agent', status: 'Suspended', joined: '2024-04-05', listings: 3 },
  { id: 5, name: 'Lungelo Khumalo', email: 'lungelo@email.com', role: 'Client', status: 'Active', joined: '2025-06-01', listings: 0 },
  { id: 6, name: 'Amara Osei', email: 'amara@email.com', role: 'Client', status: 'Active', joined: '2025-06-15', listings: 0 },
  { id: 7, name: 'Riana du Plessis', email: 'riana@email.com', role: 'Client', status: 'Active', joined: '2025-07-01', listings: 0 },
];

export const SAVED_PROPERTIES = [1, 3, 5];

export const MY_VIEWINGS = [
  { id: 1, property: 'Luxury Villa in Sandton', date: '2025-07-10', status: 'Pending', agent: 'Sarah Mokoena', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80' },
  { id: 2, property: 'Beachfront Penthouse in Clifton', date: '2025-07-15', status: 'Confirmed', agent: 'Sarah Mokoena', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80' },
];
