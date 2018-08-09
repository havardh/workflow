#include <iostream>
#include "string.h"
#include <windows.h>
using namespace std;

BOOL CALLBACK EnumWindowsProc(HWND hwnd, LPARAM lParam);

int main()
{
    EnumWindows(EnumWindowsProc, NULL);

    return 0;
}

BOOL CALLBACK EnumWindowsProc(HWND hwnd, LPARAM lParam)
{
    if (!IsWindowVisible(hwnd) || !IsWindowEnabled(hwnd))
    {
        return true;
    }

    char class_name[80];
    char title[80];
    DWORD pid;
    WINDOWINFO info;
    info.cbSize = sizeof(WINDOWINFO);
    RECT rect;

    GetClassName(hwnd, class_name, sizeof(class_name));
    GetWindowText(hwnd, title, sizeof(title));
    DWORD threadId = GetWindowThreadProcessId(hwnd, &pid);
    GetWindowInfo(hwnd, &info);
    GetWindowRect(hwnd, &rect);

    if (strcmp(title, "Microsoft Edge") != 0)
    {
        return true;
    }

    /*if (rect.left == 0 && rect.top == 0 && rect.right == 1920 && rect.bottom == 1080)
    {
        return true;
    }*/

    cout << "Hwnd: " << hwnd
         << " Pid: " << pid
         << " Window title: " << title << " Class name: " << class_name
         << " (" << rect.left << ", " << rect.top << ", " << rect.right << ", " << rect.bottom << ")"
         << " style: " << info.atomWindowType
         << endl;

    return TRUE;
}