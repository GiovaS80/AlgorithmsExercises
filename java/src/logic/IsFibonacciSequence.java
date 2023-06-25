package logic;

import output.ContinuousEasySequence;

public class IsFibonacciSequence {
    public static boolean isFibonacciSequence(int[] userNumbers) {
        boolean sentinelF = false;
        boolean checkZero = checkFibonacciNumber(5 * userNumbers[0] * userNumbers[0] + 4)
                || checkFibonacciNumber(5 * userNumbers[0] * userNumbers[0] - 4);
        boolean checkOne = checkFibonacciNumber(5 * userNumbers[1] * userNumbers[1] + 4)
                || checkFibonacciNumber(5 * userNumbers[1] * userNumbers[1] - 4);
        if (checkZero && checkOne && checkFibonacciSequence(userNumbers[0], userNumbers[1])) {
            if (userNumbers.length > 2) {
                for (int i = 2; i < userNumbers.length; i++) {
                    if (userNumbers[i] != userNumbers[i - 1] + userNumbers[i - 2]) {
                        sentinelF = false;
                        break;
                    } else
                        sentinelF = true;
                } // end for
            } else
                sentinelF = true;
        } // end if all positive
        if (sentinelF)
            ContinuousEasySequence.continuousEasySequence("Fibonacci", 0, 0, userNumbers);
        return sentinelF;
    }// end isFibonacciSequence

    private static boolean checkFibonacciNumber(int x) {
        int s = (int) (Math.sqrt(x));
        return (s * s == x);
    }// end checkFibonacciNumber

    private static boolean checkFibonacciSequence(int f, int s) {// f=first s=second
        boolean sentinelCFS = false;
        int x = 1;
        int y = 2;
        int z;
        for (int i = 0; i < 10; i++) {
            if (f == x && s == y) {
                sentinelCFS = true;
                break;
            } else {
                z = x + y;
                x = y;
                y = z;
            }
        }
        return sentinelCFS;
    }// end checkFibonacciSequence

}// end class
