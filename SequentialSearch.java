// Sequential Search
public class SequentialSearch {
    public static int search(int[] array, int key) {
        for (int index = 0; index < array.length; index++) {
            if (array[index] == key) {
                return index;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] data = {4, 2, 7, 1, 9}; //YOU CAN ALSO ASK THE USER FOR INPUT (By hemanth)
        int key = 7;
        int position = search(data, key);
        if (position != -1) {
            System.out.println("Element found at index: " + position);
        } else {
            System.out.println("Element not found in the array.");
        }
    }
}