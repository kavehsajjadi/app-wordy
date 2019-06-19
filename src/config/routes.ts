import { MainPage } from "pages/main_page"
import { TranslatePage } from "pages/translate"

export const routes = [
  {
    component: MainPage,
    path: "/",
  },
  {
    component: MainPage,
    path: "/main/:page",
  },
  {
    component: TranslatePage,
    path: "/translate",
  },
]
