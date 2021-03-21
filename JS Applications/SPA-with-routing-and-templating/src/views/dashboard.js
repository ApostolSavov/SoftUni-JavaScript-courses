import { catalogTemplate, loadingTemplate } from './templates.js'
import { getFurniture } from '../api/data.js'

export async function dashboardPage(ctx) {
    ctx.render(loadingTemplate())

    const data = await getFurniture()

    if (location.pathname != '/') {
        return
    }

    ctx.render(catalogTemplate(data, ctx.path))
}