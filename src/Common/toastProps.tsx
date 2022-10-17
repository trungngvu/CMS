export default interface toastProps {
  successToast: (mes: string) => number | string;
  errorToast: (mes: string) => number | string;
}
