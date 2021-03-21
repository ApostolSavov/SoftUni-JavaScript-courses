import { catalogTemplate, loadingTemplate } from './templates.js'
import { getMyItems } from '../api/data.js'

export async function myItemsPage(ctx) {
    ctx.render(loadingTemplate())

    const data = await getMyItems()

    if (location.pathname != '/my-furniture') {
        return
    }

    ctx.render(catalogTemplate(data, ctx.path))
}