package logic;

import output.ContinuousEasySequence;

public class NoEasySequence {
    public static boolean noEasySequence(int[] userNumbers) {
        boolean sentinelNES = true;
        int difBA = userNumbers[1] - userNumbers[0];
        int difCB = userNumbers[2] - userNumbers[1];
        int x = (userNumbers[1] / userNumbers[0]);
        int y = (userNumbers[1] % userNumbers[0]);
        if (difBA == difCB)
            ContinuousEasySequence.continuousEasySequence("add", difBA, 0, userNumbers);
        else {
            for (int i = 0; i < userNumbers[2]; i++) {
                if (userNumbers[2] == (userNumbers[1] * x) + y + i) {
                    ContinuousEasySequence.continuousEasySequence("xy", x, y + i, userNumbers);
                    sentinelNES = true;
                    break;
                } else
                    sentinelNES = false;
            } // end for
        } // end else
        return sentinelNES;
    }// end noEasySequence
}// end class
