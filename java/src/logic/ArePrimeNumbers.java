package logic;

public class ArePrimeNumbers {
    public static void arePrimeNumbers(int[] userNumbers) {
        boolean sentinelPN = true;
        for (int element : userNumbers) {
            if (element == 1 || element == 2 || element == 3 || element == 5 || element == 7)
                sentinelPN = true;
            else if (element % 2 == 0 || element % 3 == 0 || element % 5 == 0 || element % 7 == 0) {
                sentinelPN = false;
                break;
            } else {
                if (insightIntoPrimeNumbers(element)) {
                    sentinelPN = false;
                    break;
                }
            }
        } // end for
        if (sentinelPN)
            System.out.println("The numbers entered are all prime numbers.");
        System.out.println();
    }// end arePrimeNumbers

    private static boolean insightIntoPrimeNumbers(int n) {
        boolean sentinelIPN = false;
        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) {
                sentinelIPN = true;
                break;
            }
        }
        return sentinelIPN;
    }// end insightIntoPrimeNumbers

}// end class
