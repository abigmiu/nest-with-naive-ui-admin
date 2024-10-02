import { useRoute, useRouter, type LocationQueryRaw } from 'vue-router'
import { cloneDeep } from '@/utils'
import { useBaseStore } from '@/store/pinia'

export function useNav() {
  const router = useRouter()
  const route = useRoute();
  const store = useBaseStore()

  return (path, query: LocationQueryRaw = {}, data?: any) => {
    if (data) {
      store.routeData = cloneDeep(data)
    }

    const currentRouteQuery = route.query;
    console.log("🚀 ~ return ~ currentRoute:", route);
    if (currentRouteQuery.redirect_url && route.path.startsWith('/login')) {
      query.redirect_url = currentRouteQuery.redirect_url
    }

    router.push({ path, query })
  }
}
