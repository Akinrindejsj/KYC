// Akinrinde Akinkunmi
// BU23CSC1143
// Computer Science


// As a programmer in an insurance company, you are expected to design a software to be used by the human resource management department of your company. However, the actual numbers of applicants is not known. You thought of employing the concept of structures you were taught in your programming class as an undergraduate student. Using C++ program, illustrate how you intend to implement  


#include <iostream>
using namespace std;

struct Applier
{
    string name;
    int age;
    string position;
    double salary;
};


int main(){
    int n;
    cout << "Enter the number of applicants: ";
    cin >> n;

    Applier* applicant = new Applier[n];

    for (int i = 0; i < n; i++)
    {
       cout << "\nEnter details for applicant " << i+1 << ": \n";
       cout << "Name: ";
       cin >> applicant[i].name ;
       cout << "Age: ";
       cin >> applicant[i].age ;
       cout << "Position: ";
       cin >> applicant[i].position ;
       cout << "Salary: ";
       cin >> applicant[i].salary ;
    }

    cout << "\n Applicant details ";
    for (int i = 0; i < n; i++)
    {
        cout << "\nApplicant " << i+1 << ": \n";
        cout << "Name: " << applicant[i].name << endl;
        cout << "Age: " << applicant[i].age << endl;
        cout << "Position: " << applicant[i].position << endl;
        cout << "Salary: " << applicant[i].salary << endl;
    }
    
    return 0;
}
