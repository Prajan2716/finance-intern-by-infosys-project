// Binary Search
import java.util.Arrays;
public class BinarySearch {
    public static int search(int[] array, int key) {
        Arrays.sort(array);
        int start = 0;
        int end = array.length - 1;
        while (start <= end) {
            int mid = start + (end - start) / 2;
            if (array[mid] == key) {
                return mid;
            } else if (array[mid] < key) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] data = {10, 3, 6, 1, 8};
        int key = 6;
        int position = search(data, key);
        if (position != -1) {
            System.out.println("Element found at index: " + position);
        } else {
            System.out.println("Element not found in the array.");
        }
    }
}