// Location types and interfaces
export const LocationType = {
  CITY: 'CITY',
  ATTRACTION: 'ATTRACTION'
};

export const createLocation = (data) => ({
  id: data.id || String(Math.random()),
  type: data.type || LocationType.ATTRACTION,
  name: data.name || '',
  title: data.title || '',
  parentCityId: data.parentCityId,
  position: {
    lat: data.position?.lat || 0,
    lng: data.position?.lng || 0
  },
  description: {
    overview: data.description?.overview || '',
    population: data.description?.population,
    governorate: data.description?.governorate,
    category: data.description?.category,
    entryFee: data.description?.entryFee,
    openingHours: data.description?.openingHours,
    bestTimeToVisit: data.description?.bestTimeToVisit
  },
  images: data.images || []
});
