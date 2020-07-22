import { Item } from "../domain/item"

export interface ItemRepository {
    get(item: Item, quantity: number): Promise<Item[]>
}