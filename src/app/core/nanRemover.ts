export class NanRemover {
    public static removeNAN(oldNumber): number {
        return oldNumber ? parseFloat(oldNumber.toString().replace(/[^\d.-]/g, '')) : oldNumber;
    }
}