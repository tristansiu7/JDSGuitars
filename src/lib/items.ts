import { getCollection, type CollectionEntry } from 'astro:content';

type Guitar = CollectionEntry<'guitars'>;
type Equipment = CollectionEntry<'equipment'>;

// Drafts show in `npm run dev` and are left out of the build.
const showDrafts = import.meta.env.DEV;

export async function getGuitars(): Promise<Guitar[]> {
  const all = await getCollection('guitars', ({ data }) => showDrafts || !data.draft);
  return all.sort(byListing);
}

export async function getEquipment(): Promise<Equipment[]> {
  const all = await getCollection('equipment', ({ data }) => showDrafts || !data.draft);
  return all.sort(byListing);
}

// Available first, then newest first.
function byListing(a: { data: { status: string; added: Date } }, b: { data: { status: string; added: Date } }) {
  const rank = (s: string) => (s === 'available' ? 0 : s === 'on-hold' ? 1 : 2);
  const r = rank(a.data.status) - rank(b.data.status);
  if (r !== 0) return r;
  return b.data.added.getTime() - a.data.added.getTime();
}

export function guitarTitle(g: Guitar): string {
  return `${g.data.make} ${g.data.model}`;
}

export function equipmentTitle(e: Equipment): string {
  return `${e.data.brand} ${e.data.model}`;
}

export function itemRef(item: Guitar | Equipment): string {
  return item.data.ref ?? item.id.toUpperCase();
}

export function guitarUrl(g: Guitar): string {
  return `/guitars/${g.id}/`;
}

export function equipmentUrl(e: Equipment): string {
  return `/equipment/${e.id}/`;
}
