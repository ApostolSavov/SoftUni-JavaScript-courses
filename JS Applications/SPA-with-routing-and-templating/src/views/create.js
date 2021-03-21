import { createItem, itemSubmitValidation } from '../api/data.js'
import { itemFormTemplate } from './templates.js'

export async function createPage(ctx) {
    ctx.render(itemFormTemplate())
}

export async function createItemHandler(e, pageRef) {
    e.preventDefault()

    e.target.setAttribute('disabled', 'true')

    const data = itemSubmitValidation()

    if (data instanceof Error) {
        e.target.removeAttribute('disabled')
        return
    }

    await createItem(data)

    pageRef.redirect('/')
}


