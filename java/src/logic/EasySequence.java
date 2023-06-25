package logic;

import output.ContinuousEasySequence;

public class EasySequence {
    public static boolean easySequence(int[] userNumbers) {
        ContinuousEasySequence.continuousEasySequence("add", (userNumbers[1] - userNumbers[0]), 0, userNumbers);
        if ((userNumbers[1] % userNumbers[0]) == 0)
            System.out.println();
        // continuousEasySequence("mul", (userNumbers[1] / userNumbers[0]), 0,
        // userNumbers);
        else {
            int x = (userNumbers[1] / userNumbers[0]);
            int y = (userNumbers[1] % userNumbers[0]);
            ContinuousEasySequence.continuousEasySequence("xy", x, y, userNumbers);
        }
        return true;
    }// end easySequence
}// end class
