import { ROUTES } from "../constants/tabsRouter"

export const ReturnTabNumber = (tabName) => {
    switch(tabName) {
        case ROUTES.AGENT_DASHBOARD.name:
            return ROUTES.AGENT_DASHBOARD.id
        case ROUTES.TARGET.name:
            return ROUTES.TARGET.id
        case ROUTES.OBJECTIVE.name:
            return ROUTES.OBJECTIVE.id
        case ROUTES.QUESTION_DOCS.name:
            return ROUTES.QUESTION_DOCS.id
        case ROUTES.VISITS.name:
            return ROUTES.VISITS.id

    }
}