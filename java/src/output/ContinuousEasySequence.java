package output;

import java.util.ArrayList;
import java.util.List;

public class ContinuousEasySequence {
    public static void continuousEasySequence(String o, int x, int y, int[] userNumbers) {
        int indexArr = userNumbers.length;
        List<Integer> tempList = new ArrayList<Integer>();
        for (int i = 0; i < indexArr + 10; i++) {
            if (i < indexArr)
                tempList.add(userNumbers[i]);
            else if (o == "add")
                tempList.add(tempList.get(i - 1) + x);
            else if (o == "mul")
                tempList.add(tempList.get(i - 1) * x);
            else if (o == "xy")
                tempList.add((tempList.get(i - 1) * x) + y);
            else if (o == "Fibonacci")
                tempList.add(tempList.get(i - 1) + (tempList.get(i - 2)));
        }

        System.out.println("Easy Sequence " + o);
        if (o == "xy")
            System.out.println("I mean, the number n times x (" + x + ") plus y (" + y + ")");
        System.out.println(tempList.subList(indexArr, tempList.size()));
        System.out.println();
    }// end continuousEasySequence
}// end class
