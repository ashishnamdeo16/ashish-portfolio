declare module "TagCloud" {
  export default function TagCloud(
    element: string | HTMLElement,
    texts: string[],
    options?: Record<string, unknown>
  ): { destroy?: () => void };
}
