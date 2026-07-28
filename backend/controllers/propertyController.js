const properties = [
  { id: 1, title: '3 Bed House in Sandton', price: 2500000, type: 'sale', bedrooms: 3, location: 'Sandton, Johannesburg' },
  { id: 2, title: 'Modern Apartment in Cape Town', price: 15000, type: 'rent', bedrooms: 2, location: 'Sea Point, Cape Town' },
];

const getProperties = (req, res) => {
  const { type, minPrice, maxPrice } = req.query;
  let result = properties;
  if (type) result = result.filter(p => p.type === type);
  if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
  if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));
  res.json(result);
};

const getProperty = (req, res) => {
  const property = properties.find(p => p.id === Number(req.params.id));
  if (!property) return res.status(404).json({ message: 'Property not found' });
  res.json(property);
};

module.exports = { getProperties, getProperty };
