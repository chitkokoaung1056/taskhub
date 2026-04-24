import { AddTaskButton } from "@/components/AddTaskButton"

export default function TaskPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Tasks</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Manage and track your tasks efficiently
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <AddTaskButton />
        </div>
      </div>

      {/* Filters and Sorting 
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>All Tasks ({filteredAndSortedTasks.length})</CardTitle>
            <TaskFilters
              sortBy={sortBy}
              filterBy={filterBy}
              onSortChange={setSortBy}
              onFilterChange={setFilterBy}
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredAndSortedTasks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No tasks found matching your filters
            </div>
          ) : (
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleStatus={toggleTaskStatus}
                  onEdit={setEditingTask}
                  onDelete={setDeletingTaskId}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <EditTaskDialog
        task={editingTask}
        isOpen={editingTask !== null}
        onClose={() => setEditingTask(null)}
        onTaskUpdate={updateTask}
      />

      <AlertDialog open={deletingTaskId !== null} onOpenChange={() => setDeletingTaskId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingTaskId && deleteTask(deletingTaskId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      */}
    </div>
  )
}
