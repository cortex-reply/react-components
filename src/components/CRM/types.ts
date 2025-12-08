import type {User, Customer, Deal, DealCategory} from "@/payload-types"


export type {User, Customer, Deal, DealCategory}


export type PartialComment = Partial<NonNullable<Deal['comments']>[number]>;
export type EditableDeal = Omit<Partial<Deal>, 'comments' | 'customer'> & {
  comments?: PartialComment[] | null;
  customer: Partial<Customer> ;
};

// export type CRMCategory = {
//   id: string
//   name: string
//   type: "proposition" | "source" | "sector"
// }

export type CRMStatus = "Cold" | "Qualified" | "Proposal Made" | "SoW Submitted" | "Won" | "Lost"
export type gecoStatus = 'firm' | 'forecast' | 'other'
// export type Deal = {
//   id: number
//   customer: Partial<Customer> 
//   value: number
//   assignee: Partial<User>
//   status: CRMStatus
//   categories: string[]
//   dateLogged: string
//   closureDate: string
//   updatedAt: string
//   comments: Comment[]
//   description: string
// }

// export type Comment = {
//   id: string
//   text: string
//   author?: Partial<User>
//   timestamp: string
// }

export type BoardData = {
  deals?: Deal[]
  users?: User[]
  customers?: Customer[]
  categories?: DealCategory[]
}

