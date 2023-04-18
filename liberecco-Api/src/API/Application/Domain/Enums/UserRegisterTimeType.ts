export enum RegisterTimeType {
	INPUT = 1,
	OUTPUT = 2,
}

export const userRegisterTimeTypes = [
	{
	  id: RegisterTimeType.INPUT,
	  name: 'Entrada',
	},
	{
	  id: RegisterTimeType.OUTPUT,
	  name: 'Salida',
	}
  ];

export const registerTimeValid = [
	RegisterTimeType.INPUT,
	RegisterTimeType.OUTPUT,
];