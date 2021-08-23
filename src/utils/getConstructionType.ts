export default function getConstructionType(type: number): string {
  switch (type) {
    case 1:
      return 'Residencial';
    case 2:
      return 'Comercial';
    default:
      return 'Mista';
  }
}
