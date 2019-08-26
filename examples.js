var examples = {
factorial: 
`comment^ Program to find the factorial of a number provided by the user
comment^ Change the value for a different result
function^ findFactorial | void | int@num
    int@factorial = 1
    if^ num < 0
        print^ "Sorry, factorial does not exist for negative numbers"
    end^
    elif^ num == 0
        print^ 0
    end^
    else^
        forLoop^ i | 1 | num
            factorial = factorial * i
        end^
        print^ factorial
    end^
end^
findFactorial(4)`,
fibonacci:
`int@nterms = 10
comment^ first two terms
int@n1 = 0
int@n2 = 1
int@count = 0
comment^ check if the number of terms is valid
if^ nterms <= 0
    print^ "Please enter a positive integer"
end^
elif^ nterms == 1
    print^ n1
end^
else^
    whileLoop^ count < nterms
        print^ n1
        int@nth = n1 + n2
        comment^ update values
        n1 = n2
        n2 = nth
        count = count + 1
    end^
end^`,
};