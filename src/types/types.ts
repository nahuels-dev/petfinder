export interface TableProps {
  chip: boolean,
  chip_text: string,
  collar: boolean,
  collar_text: string,
  size: string,
  size_text: string
  incapacidades: boolean,
  incapacidades_text: string,
  amigable: boolean,
  amigable_text: string,
  alergias: string,
  alergias_text: string
}

export interface PetStateProps {
  estado: string,
  texto: string
}

export interface CarouselProps{
  tipo: string,
  titulo: string
}