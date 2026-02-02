export interface PartMaster {
  parentPart: string;
  childPart: string;
  description: string;
  externalDiameter: number;
  wallThickness: number;
  development: number;
  type: string;
  family: string;
  client: string;
  line: number;
  setupTimeMajor: number;
  cycleTime: number;
  pcsPerHour: number;
  packagingQuantity: number;
  boxPerPallet: number;
}
