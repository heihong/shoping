interface offer {
  value : number;
  type : string;
}

interface offerSile{
  value : number;
  type : string;
  sliceValue : number;
}

export type offerType = offerSile | offer;

