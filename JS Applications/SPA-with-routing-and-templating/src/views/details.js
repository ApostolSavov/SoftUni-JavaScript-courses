import {getItem} from '../api/data.js'
import { detailsTemplate, loadingTemplate } from './templates.js'

export async function detailsPage(ctx) {
    ctx.render(loadingTemplate())

    const data = await getItem(ctx.params.id)

    ctx.render(detailsTemplate(data, sessionStorage.getItem('userId')))
}