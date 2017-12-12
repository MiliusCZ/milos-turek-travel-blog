export const mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?size=570x280&scale=2&key=AIzaSyDZVoo4kFPlR2lD_RYRd91_Uj64Qq7xFOE&style=saturation:-100|visibility:simplified&style=element:labels|visibility:off&style=feature:road|weight:0.1|visibility:on&style=feature:water|color:0x6474ae&style=feature:road|element:labels|visibility:off&style=feature:landscape|color:0xe0e0e0&style=feature:poi|color:0xffffff&markers=size:tiny|color:0xfae271|';

export const getUrl = (places) => `${mapUrl}${places.join('|')}`;

export const getUrlForPoints = (points) => {
    const places = [];
    points.map((point) => places.push(`${point.longitude},${point.latitude}`));

    return getUrl(places);
};
