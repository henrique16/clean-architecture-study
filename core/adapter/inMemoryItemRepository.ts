import { ItemRepository } from "../interface/itemRepository"
import { Item } from "../domain/item"

export class InMemoryItemRepository implements ItemRepository {
    public get(item: Item, quantity: number): Promise<Item[]> {
        const items: Item[] = []
        for (let index = 1; index <= quantity; index++) {
            let name = item.name
            items.push(new Item(`${name}${index}`))
        }
        return Promise.resolve(items)
    }
}