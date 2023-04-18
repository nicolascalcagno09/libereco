export enum CuponType {
	PROMOCION = 1,
	CANJEABLE = 2,
}

export const cuponTypeTypes = [
	{
	  id: CuponType.PROMOCION,
	  name: 'Promocion',
	},
	{
	  id: CuponType.CANJEABLE,
	  name: 'Canjeable',
	}
  ];

export const cuponTypeValid = [
	CuponType.PROMOCION,
	CuponType.CANJEABLE,
];