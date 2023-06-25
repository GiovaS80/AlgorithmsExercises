package logic;

import java.util.Arrays;

public class IsBellNumbers {
    public static boolean isBellNumbers(int[] userNumbers) {
        int it = 20;
        int lengthUN = userNumbers.length;
        int indexL1, indexL2, sentinelCode1, sentinelCode2;
        indexL1 = indexL2 = sentinelCode1 = sentinelCode2 = 0;
        boolean sentinelBN = false;
        int[][] bell = new int[it + 1][];
        for (int n = 0; n < it; n++) {
            bell[n] = (new int[n + 1]);
        }
        bell[0][0] = 1;
        for (int i = 1; i < it; i++) {// start big for
            bell[i][0] = bell[i - 1][i - 1];
            if (sentinelCode1 >= 0 && indexL1 < lengthUN) {
                if (bell[i][0] == userNumbers[indexL1]) {
                    indexL1++;
                    if (sentinelCode1 == 0)
                        sentinelCode1 = i;
                } else {
                    if (indexL1 != 0) {
                        sentinelCode1 = -1;
                        break;
                    }
                }
            }
            if (userNumbers[lengthUN - 1] < bell[i][0] && sentinelCode1 <= 0) {
                sentinelCode1 = -2;
                break;
            }
            for (int j = 1; j <= i; j++) {// start internal for
                bell[i][j] = bell[i - 1][j - 1] + bell[i][j - 1];
                if (sentinelCode2 >= 0 && indexL2 < lengthUN) {
                    if (bell[i][j] == userNumbers[indexL2]) {
                        indexL2++;
                        if (sentinelCode2 == 0)
                            sentinelCode2 = i;
                    } else {
                        if (indexL2 != 0 && indexL2 != lengthUN)
                            sentinelCode2 = -2;
                    }
                }
            } // end internal for
        } // end big for
        if (sentinelCode1 > 0) {
            int startPoint = sentinelCode1 + lengthUN;
            int[] tempArray = new int[10];
            for (int i = 0; i < 10; i++) {
                tempArray[i] = bell[startPoint + i][0];
            }
            System.out.println("The numbers entered are part of the Bell Sequence");
            System.out.println(Arrays.toString(tempArray));
            System.out.println();
            sentinelBN = true;
        } else if (sentinelCode2 > 0) {
            int levelPoint = sentinelCode1 == -2 ? sentinelCode2 : sentinelCode2 + 1;
            System.out.println("The numbers entered are part of Triangle scheme level " + (levelPoint)
                    + " of the Bell Sequence" + sentinelCode2);
            System.out.println(Arrays.toString(bell[levelPoint]));
            System.out.println();
            sentinelBN = true;
        }
        return sentinelBN;
    }// end isBellNumbers
}// end class
