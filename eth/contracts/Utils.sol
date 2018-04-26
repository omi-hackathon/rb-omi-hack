pragma solidity ^0.4.19;

import "./dependencies/strings.sol";

library Utils {
    using strings for *;

    function strcat(string s1, string s2) pure public returns (string) {
        return s1.toSlice().concat(s2.toSlice());
    }

    function uintToString(uint v) pure public returns (string str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory s = new bytes(i);
        for (uint j = 0; j < i; j++) {
            s[j] = reversed[i - j - 1];
        }
        str = string(s);
    }
}