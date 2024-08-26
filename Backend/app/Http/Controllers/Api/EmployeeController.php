<?php

namespace App\Http\Controllers\Api;
use App\Models\Employee;
use App\Models\Department;
use App\Models\Achievement;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EmployeeController extends Controller
{
    // List Employees
    public function index()
    {
        $employees = Employee::with(['department', 'achievements'])->get();
        return response()->json($employees);
    }

    // Create Employee
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email',
            'phone' => 'required|string|max:15',
            'address' => 'required|string',
            'department_id' => 'required|exists:departments,id',
            'achievements' => 'array',
            'achievements.*.id' => 'exists:achievements,id',
            'achievements.*.date' => 'required|date',
        ]);

        $employee = Employee::create($validated);
        $employee->achievements()->sync($this->formatAchievements($request->achievements));

        return response()->json($employee->load(['department', 'achievements']));
    }

    // Update Employee
    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:employees,email,' . $employee->id,
            'phone' => 'sometimes|required|string|max:15',
            'address' => 'sometimes|required|string',
            'department_id' => 'sometimes|required|exists:departments,id',
            'achievements' => 'sometimes|array',
            'achievements.*.id' => 'exists:achievements,id',
            'achievements.*.date' => 'required|date',
        ]);

        $employee->update($validated);
        if ($request->has('achievements')) {
            $employee->achievements()->sync($this->formatAchievements($request->achievements));
        }

        return response()->json($employee->load(['department', 'achievements']));
    }

    // Delete Employee
    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response()->json(['message' => 'Employee deleted successfully']);
    }

    private function formatAchievements($achievements)
    {
        return collect($achievements)->mapWithKeys(function ($achievement) {
            return [$achievement['id'] => ['achievement_date' => $achievement['date']]];
        });
    }
}
