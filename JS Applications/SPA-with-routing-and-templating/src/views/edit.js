import { getItem, editItem, itemSubmitValidation } from '../api/data.js'
import { itemFormTemplate, loadingTemplate } from './templates.js'

export async function editPage(ctx) {
    ctx.render(loadingTemplate())

    const data = await getItem(ctx.params.id)

    if (location.pathname != `/edit/${ctx.params.id}`) {
        return
    }

    ctx.render(itemFormTemplate(data))
}

export async function editItemHandler(e, pageRef) {
    e.preventDefault()

    e.target.setAttribute('disabled', 'true')

    const data = itemSubmitValidation()

    if (data instanceof Error) {
        e.target.removeAttribute('disabled')
        return
    }

    const id = (location.pathname.split('/')).pop()

    await editItem(id, data)

    pageRef.redirect('/')
}
