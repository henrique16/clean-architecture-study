import { GetItems } from "../use-case/getItems"
import { ItemRepository } from "../interface/itemRepository"
import { InMemoryItemRepository } from "../adapter/inMemoryItemRepository"
import { Item } from "../domain/item"

export function getItems(item: Item, quantity: number) {
    const itemRepository: ItemRepository = new InMemoryItemRepository()
    return new GetItems(item, quantity, itemRepository).get()
}