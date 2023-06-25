import logic.RunListFun;

public class MySolution {
    public static void main(String[] args) {
        int[] userNum = new int[args.length];
        boolean isGreater = false;
        System.out.println();
        System.out.println("********** Start Program **********");
        System.out.println();
        if (args.length > 0) {
            if (args.length > 1) {
                try {
                    for (int i = 0; i < args.length; i++) {
                        userNum[i] = Integer.parseInt(args[i]);
                        if (i != 0) {
                            if (userNum[i] <= userNum[i - 1]) {
                                isGreater = false;
                                System.out.println("The required number sequence must have increasing numbers.");
                                break;
                            } else
                                isGreater = true;
                        } // end if is not first element
                        else {
                            if (userNum[i] <= 0) {
                                System.out.println(
                                        "For this version of the project, the first number cannot be zero or even negative");
                                break;
                            }
                        } // end else is first element
                    } // end for
                } // end TRY
                catch (Exception e) {
                    System.err.println("The design accepts only an increasing sequence of positive integers.");
                }
            } // end if args.length > 1
            else
                System.out.println("The project requires you to enter a number sequence.");
        } // end if args.length > 0
        else
            System.out.println("No number sequence has been entered");

        if (isGreater)
            RunListFun.runListFun(userNum);
        else
            System.out.println(
                    "In this version of the project, in case of inserting wrong values, it is not possible to insert other values");
        System.out.println();
        System.out.println("********** End Program **********");
        System.out.println();
    }// end main
}
