import { useQuery } from "@tanstack/react-query";
import type { FeaturedService, Review, ServiceCategory } from "../backend.d";
import { useActor } from "./useActor";

export function useServiceCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<ServiceCategory[]>({
    queryKey: ["serviceCategories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServiceCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeaturedServices() {
  const { actor, isFetching } = useActor();
  return useQuery<FeaturedService[]>({
    queryKey: ["featuredServices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchServices(keyword: string) {
  const { actor, isFetching } = useActor();
  return useQuery<ServiceCategory[]>({
    queryKey: ["searchServices", keyword],
    queryFn: async () => {
      if (!actor || !keyword.trim()) return [];
      return actor.getServiceCategories();
    },
    enabled: !!actor && !isFetching && keyword.trim().length > 0,
  });
}

export function useReviewsForService(serviceId: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["reviewsForService", String(serviceId)],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReviewsForService(serviceId);
    },
    enabled: !!actor && !isFetching,
  });
}
