package logic;

public class RunListFun {
    public static void runListFun(int userNumbers[]) {
        boolean sentinel = true;

        ArePrimeNumbers.arePrimeNumbers(userNumbers);

        if (userNumbers.length == 2) {
            if (EasySequence.easySequence(userNumbers))
                sentinel = false;
        } else if (userNumbers.length == 3) {
            if (NoEasySequence.noEasySequence(userNumbers))
                sentinel = false;
        } else {
            if (DifficultSequence.difficultSequence(userNumbers))
                sentinel = false;
        }

        if (IsFibonacciSequence.isFibonacciSequence(userNumbers))
        sentinel = false;

        if (IsBellNumbers.isBellNumbers(userNumbers))
        sentinel = false;

        if (sentinel)
            System.out.println(
                    "I am sorry. With the inserted sequence, with this version of the project, it was not possible to determine a continuous sequence");
    }// end runListFun
}// end class
