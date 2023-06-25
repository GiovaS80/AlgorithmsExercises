package logic;

import output.ContinuousEasySequence;

public class DifficultSequence {
    static boolean difficultSequence(int[] userNumbers) {
        boolean sentinelDS = false;
        int dif = userNumbers[1] - userNumbers[0];
        for (int i = 2; i < userNumbers.length; i++) {
            if ((userNumbers[i] - userNumbers[i - 1]) != dif) {
                sentinelDS = false;
                break;
            } else
                sentinelDS = true;
        }
        if (sentinelDS)
            ContinuousEasySequence.continuousEasySequence("add", dif, 0, userNumbers);
        // for now, I have not idea
        return sentinelDS;
    }// end difficultSequence
}// end class
