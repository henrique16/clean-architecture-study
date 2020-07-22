import { ItemRepository } from "../interface/itemRepository";
import { Item } from "../domain/item"

export class GetItems {
    private item: Item
    private quantity: number
    private itemRepository: ItemRepository

    public constructor(item: Item, quantity: number, itemRepository: ItemRepository) {
        this.item = item
        this.quantity = quantity
        this.itemRepository = itemRepository
    }

    public async get(): Promise<Item[][]> {
        try {
            const response: Item[][] = []
            const items: Item[] = await this.itemRepository.get(this.item, this.quantity)
            const quantityPerPage: number = 3
            while (items.length > 0) {
                let chunck: Item[] = items.splice(0, quantityPerPage)
                response.push(chunck)
            }
            return response
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
}