import type { BoardData, Deal, Customer, DealCategory, CRMStatus } from './types'
import type { User } from '@/payload-types';

export const mockCustomers: Customer[] = [
  { id: 1, name: "Acme Corp", intro: "A leading technology company", active: true, createdAt: "2023-01-01", updatedAt: "2023-01-01" },
  { id: 2, name: "GlobalTech", intro: "Innovative solutions provider", active: true, createdAt: "2023-01-01", updatedAt: "2023-01-01" },
  { id: 3, name: "InnoSystems", intro: "Cutting-edge software development", active: false, createdAt: "2023-01-01", updatedAt: "2023-01-01" },
]

export const mockCategories: DealCategory[] = [
  { id: 1, name: "Software", type: "proposition", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
  { id: 2, name: "Hardware", type: "proposition", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
  { id: 3, name: "Referral", type: "source", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
  { id: 4, name: "Outbound", type: "source", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
  { id: 5, name: "Tech", type: "sector", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
  { id: 6, name: "Finance", type: "sector", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
]


export const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john.doe@example.com", role: "user", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
  { id: "2", name: "Jane Smith", email: "jane.smith@example.com", role: "user", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
  { id: "3", name: "Bob Johnson", email: "bob.johnson@example.com", role: "user", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
  { id: "4", name: "Alice Brown", email: "alice.brown@example.com", role: "user", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
  { id: "5", name: "Charlie Davis", email: "charlie.davis@example.com", role: "user", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
];

export const mockDeals: Deal[] = [
  {
    id: 1,
    customer: mockCustomers[0],
    value: 50000,
    assignee: mockUsers[2],
    status: "Qualified",
    categories: mockCategories.slice(0, 3), // Pass in 3 of the mockCategories
    dateLogged: "2023-01-15",
    closureDate: "2023-06-30",
    updatedAt: "2023-05-01T10:00:00Z",
    createdAt: "2023-01-01",
    comments: [{ id: "1", text: "Initial contact made", author: mockUsers[5], timestamp: "2023-01-15T09:00:00Z" }],
    description: "Potential software solution for Acme Corp",
  },
  {
    id: 2,
    customer: { id: 2, name: "GlobalTech", active: true, createdAt: "2023-01-01", updatedAt: "2023-01-01" },
    value: 75000,
    assignee: { id: "2", name: "Jane Smith", email: "jane.smith@example.com", role: "user", createdAt: "2023-01-01", updatedAt: "2023-01-01" },
    status: "Proposal Made",
    categories: mockCategories.slice(0, 3), // Pass in 3 of the mockCategories
    dateLogged: "2023-02-01",
    closureDate: "2023-07-31",
    updatedAt: "2023-05-10T14:30:00Z",
    createdAt: "2023-01-01",
    comments: [{ id: "2", text: "Proposal sent", author: mockUsers[1], timestamp: "2023-02-15T09:00:00Z" }],
    description: "Custom hardware solution for GlobalTech",
  },
]



export const mockBoardData: BoardData = {
  deals: mockDeals,
  users: mockUsers,
  customers: mockCustomers,
  categories: mockCategories,
}

// export const mockStatuses: CRMStatus[] = ["Cold", "Qualified", "Proposal Made", "Won", "Lost"]

