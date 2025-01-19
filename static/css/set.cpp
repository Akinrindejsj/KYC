#include <iostream>
#include <string>
using namespace std;

struct Applier {
    string name;
    int age;
    string position;
    double salary;
};

int main() {
    int n;
    cout << "Enter the number of applicants: ";
    cin >> n;

    Applier* applicant = new Applier[n];

    for (int i = 0; i < n; i++) {
        cin.ignore(); // Clear the newline character from input buffer
        cout << "\nEnter details for applicant " << i + 1 << ": \n";

        cout << "Name: ";
        getline(cin, applicant[i].name); // Allow spaces in the name

        cout << "Age: ";
        cin >> applicant[i].age;

        cin.ignore(); // Clear the newline character
        cout << "Position: ";
        getline(cin, applicant[i].position); // Allow spaces in the position name

        cout << "Salary: ";
        cin >> applicant[i].salary;
    }

    cout << "\nApplicant details:\n";
    for (int i = 0; i < n; i++) {
        cout << "\nApplicant " << i + 1 << ": \n";
        cout << "Name: " << applicant[i].name << endl;
        cout << "Age: " << applicant[i].age << endl;
        cout << "Position: " << applicant[i].position << endl;
        cout << "Salary: " << applicant[i].salary << endl;
    }

    delete[] applicant; // Free the dynamically allocated memory
    return 0;
}
